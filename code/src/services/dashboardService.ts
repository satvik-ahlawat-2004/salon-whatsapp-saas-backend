import { AppointmentStatus } from "@prisma/client";
import { prisma } from "../config/prisma";

const DAY_HOURS = 8;

export const getDashboardMetrics = async (salonId: string) => {
  const now = new Date();
  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);

  const [todayCount, upcomingCount, noShowCount, totalCount, staffCount, todaysAppointments] =
    await Promise.all([
      prisma.appointment.count({
        where: { salonId, startTime: { gte: startOfDay, lte: endOfDay } },
      }),
      prisma.appointment.count({
        where: { salonId, startTime: { gt: now } },
      }),
      prisma.appointment.count({
        where: { salonId, status: AppointmentStatus.NO_SHOW },
      }),
      prisma.appointment.count({ where: { salonId } }),
      prisma.staff.count({ where: { salonId, isActive: true } }),
      prisma.appointment.findMany({
        where: { salonId, startTime: { gte: startOfDay, lte: endOfDay } },
        select: { startTime: true, endTime: true },
      }),
    ]);

  const totalMinutesToday = todaysAppointments.reduce((acc, appt) => {
    const minutes = (appt.endTime.getTime() - appt.startTime.getTime()) / 60000;
    return acc + Math.max(minutes, 0);
  }, 0);

  const availableMinutes = staffCount * DAY_HOURS * 60;
  const staffUtilization = availableMinutes > 0 ? +(totalMinutesToday / availableMinutes).toFixed(2) : 0;
  const noShowRate = totalCount > 0 ? +(noShowCount / totalCount).toFixed(2) : 0;

  return {
    todayAppointments: todayCount,
    upcomingAppointments: upcomingCount,
    noShowRate,
    staffUtilization,
  };
};

