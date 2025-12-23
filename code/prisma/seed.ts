import { PrismaClient, UserRole, AppointmentStatus, MessageDirection, MessageStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const salon = await prisma.salon.upsert({
    where: { id: "00000000-0000-0000-0000-000000000001" },
    update: {},
    create: {
      id: "00000000-0000-0000-0000-000000000001",
      name: "Ghaziabad Salon One",
      phone: "+91-9000000000",
      city: "Ghaziabad",
    },
  });

  const owner = await prisma.user.upsert({
    where: { email: "owner@salon.com" },
    update: {},
    create: {
      salonId: salon.id,
      name: "Owner User",
      email: "owner@salon.com",
      password: "$2b$10$j3dSL2hY.WUyCaGqbPXoa.e294Xzdyu9gCbgoBQdMrIH8kMq26naG", // password123
      role: UserRole.OWNER,
      phone: "+91-9000000001",
    },
  });

  const staff = await prisma.staff.upsert({
    where: { id: "00000000-0000-0000-0000-000000000010" },
    update: {},
    create: {
      id: "00000000-0000-0000-0000-000000000010",
      salonId: salon.id,
      name: "Stylist One",
      phone: "+91-9000000002",
      title: "Stylist",
    },
  });

  const service = await prisma.service.upsert({
    where: { id: "00000000-0000-0000-0000-000000000020" },
    update: {},
    create: {
      id: "00000000-0000-0000-0000-000000000020",
      salonId: salon.id,
      name: "Haircut",
      description: "Basic haircut",
      durationMinutes: 45,
      price: 499.0,
    },
  });

  const customer = await prisma.customer.upsert({
    where: { salonId_phone: { salonId: salon.id, phone: "+91-9000000003" } },
    update: {},
    create: {
      salonId: salon.id,
      name: "Customer One",
      phone: "+91-9000000003",
      email: "customer1@example.com",
    },
  });

  const appointment = await prisma.appointment.upsert({
    where: { id: "00000000-0000-0000-0000-000000000030" },
    update: {},
    create: {
      id: "00000000-0000-0000-0000-000000000030",
      salonId: salon.id,
      customerId: customer.id,
      staffId: staff.id,
      serviceId: service.id,
      startTime: new Date(Date.now() + 60 * 60 * 1000),
      endTime: new Date(Date.now() + 60 * 60 * 1000 + 45 * 60 * 1000),
      status: AppointmentStatus.CONFIRMED,
      notes: "First visit",
    },
  });

  await prisma.appointmentStatusHistory.create({
    data: {
      appointmentId: appointment.id,
      status: AppointmentStatus.CONFIRMED,
      note: "Confirmed via phone",
      changedById: owner.id,
    },
  });

  await prisma.whatsAppMessage.create({
    data: {
      salonId: salon.id,
      appointmentId: appointment.id,
      direction: MessageDirection.OUTBOUND,
      status: MessageStatus.SENT,
      fromNumber: "+91-9000000000",
      toNumber: customer.phone,
      body: "Your appointment is confirmed.",
      waMessageId: "demo-message-id",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

