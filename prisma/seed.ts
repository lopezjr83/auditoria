import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Create Super Admin User
  const adminEmail = "lopezjr@visionproces.com";
  const adminPassword = "1234567890";

  const passwordHash = await bcrypt.hash(adminPassword, 10);

  const superAdmin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: "Super Admin",
      passwordHash,
      role: "SUPER_ADMIN",
      isActive: true,
    },
  });

  console.log(`✅ Super Admin created: ${superAdmin.email}`);
  console.log(`   Role: ${superAdmin.role}`);
  console.log(`   Password: ${adminPassword} (temporary - change on first login)`);

  // Create Default Workspace for Admin
  const workspace = await prisma.workspace.upsert({
    where: { slug: "visionproces" },
    update: {},
    create: {
      name: "VisionProces",
      slug: "visionproces",
      description: "Main workspace for VisionProces",
    },
  });

  console.log(`✅ Workspace created: ${workspace.name}`);

  // Add Admin as Owner to Workspace
  const member = await prisma.workspaceMember.create({
    data: {
      userId: superAdmin.id,
      workspaceId: workspace.id,
      role: "OWNER",
    },
  }).catch(async () => {
    // If already exists, just fetch it
    return prisma.workspaceMember.findFirst({
      where: {
        userId: superAdmin.id,
        workspaceId: workspace.id,
      },
    });
  });

  if (member) {
    console.log(`✅ Admin added to workspace as ${member.role}`);
  }

  // Create AuditTypes
  const auditTypes = [
    {
      code: "SMETA",
      name: "SMETA - Sedex",
      description: "Social and Labour Convergence Initiative",
    },
    {
      code: "ISO_9001",
      name: "ISO 9001 - Quality Management",
      description: "Quality Management Systems",
    },
    {
      code: "ISO_14001",
      name: "ISO 14001 - Environmental Management",
      description: "Environmental Management Systems",
    },
    {
      code: "ISO_45001",
      name: "ISO 45001 - Occupational Health & Safety",
      description: "Occupational Health and Safety Management Systems",
    },
  ];

  for (const auditType of auditTypes) {
    await prisma.auditType.upsert({
      where: { code: auditType.code },
      update: {},
      create: {
        code: auditType.code,
        name: auditType.name,
        description: auditType.description,
        checklist: {}, // Empty checklist for now
      },
    });
  }

  console.log(`✅ AuditTypes created (${auditTypes.length})`);

  console.log("\n🎉 Database seed completed successfully!");
  console.log("\n📝 Super Admin Credentials:");
  console.log(`   Email: ${adminEmail}`);
  console.log(`   Password: ${adminPassword}`);
  console.log(`   Role: SUPER_ADMIN\n`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
