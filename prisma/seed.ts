import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({ url: "file:dev.db" });
const prisma = new PrismaClient({ adapter } as never);

async function main() {
  console.log("Limpando banco de dados...");
  await prisma.transacao.deleteMany();
  await prisma.campanha.deleteMany();
  await prisma.anunciante.deleteMany();
  await prisma.taxaProcessamento.deleteMany();

  console.log("Criando taxas de processamento...");
  await prisma.taxaProcessamento.createMany({
    data: [
      {
        nome: "Taxa Padrão por Transação",
        tipo: "fixo",
        valor: 2.99,
        descricao: "Taxa fixa cobrada por transação processada",
      },
      {
        nome: "Taxa de Processamento Digital",
        tipo: "percentual",
        valor: 1.5,
        descricao: "1.5% sobre o valor de cada operação processada",
      },
    ],
  });

  console.log("Criando anunciantes...");

  const anunciantes = await Promise.all([
    prisma.anunciante.create({
      data: {
        nome: "Cleia M.",
        empresa: "Cleia M. — Perfil Verificado",
        email: "cleia@vibeprive.com",
        telefone: "(11) 99900-0001",
        segmento: "Vídeo Verificado",
        status: "ativo",
        saldo: 5000.0,
      },
    }),
    prisma.anunciante.create({
      data: {
        nome: "Frianca A.",
        empresa: "Frianca A. — Perfil Verificado",
        email: "frianca@vibeprive.com",
        telefone: "(11) 99900-0002",
        segmento: "Vídeo Verificado",
        status: "ativo",
        saldo: 3800.0,
      },
    }),
    prisma.anunciante.create({
      data: {
        nome: "Tatiana B.",
        empresa: "Tatiana B. — Premium",
        email: "tatiana@vibeprive.com",
        telefone: "(11) 99900-0003",
        segmento: "Premium",
        status: "ativo",
        saldo: 12500.0,
      },
    }),
    prisma.anunciante.create({
      data: {
        nome: "Renata S.",
        empresa: "Renata S. — Premium",
        email: "renata@vibeprive.com",
        telefone: "(11) 99900-0004",
        segmento: "Premium",
        status: "ativo",
        saldo: 9200.0,
      },
    }),
    prisma.anunciante.create({
      data: {
        nome: "Vanessa K.",
        empresa: "Vanessa K. — Perfil Verificado",
        email: "vanessa@vibeprive.com",
        telefone: "(11) 99900-0005",
        segmento: "Vídeo Verificado",
        status: "ativo",
        saldo: 4100.0,
      },
    }),
    prisma.anunciante.create({
      data: {
        nome: "Priscila M.",
        empresa: "Priscila M. — VIP",
        email: "priscila@vibeprive.com",
        telefone: "(11) 99900-0006",
        segmento: "VIP",
        status: "ativo",
        saldo: 18700.0,
      },
    }),
  ]);

  console.log("Criando campanhas...");

  const campanhas = await Promise.all([
    prisma.campanha.create({
      data: {
        titulo: "Destaque — Cleia M. — Banibarra",
        descricao: "Impulsionar perfil verificado no topo das buscas",
        orcamento: 500.0,
        gasto: 320.0,
        status: "ativa",
        tipo: "display",
        impressoes: 41200,
        cliques: 1834,
        inicioEm: new Date("2026-06-01"),
        fimEm: new Date("2026-06-30"),
        anuncianteId: anunciantes[0].id,
      },
    }),
    prisma.campanha.create({
      data: {
        titulo: "Destaque — Frianca A. — Banicarria",
        descricao: "Impulsionar perfil verificado na região",
        orcamento: 400.0,
        gasto: 390.0,
        status: "encerrada",
        tipo: "social",
        impressoes: 38000,
        cliques: 2100,
        inicioEm: new Date("2026-05-01"),
        fimEm: new Date("2026-05-31"),
        anuncianteId: anunciantes[1].id,
      },
    }),
    prisma.campanha.create({
      data: {
        titulo: "Perfil Premium — Tatiana B.",
        descricao: "Exposição máxima para perfil Premium na Barra",
        orcamento: 1200.0,
        gasto: 780.0,
        status: "ativa",
        tipo: "video",
        impressoes: 97500,
        cliques: 4320,
        inicioEm: new Date("2026-06-10"),
        fimEm: new Date("2026-07-10"),
        anuncianteId: anunciantes[2].id,
      },
    }),
    prisma.campanha.create({
      data: {
        titulo: "Lançamento — Renata S. — Centro",
        descricao: "Campanha de estreia para novo perfil verificado",
        orcamento: 600.0,
        gasto: 0.0,
        status: "rascunho",
        tipo: "busca",
        impressoes: 0,
        cliques: 0,
        anuncianteId: anunciantes[3].id,
      },
    }),
    prisma.campanha.create({
      data: {
        titulo: "Destaque — Vanessa K. — Cerita",
        descricao: "Impulsionar perfil verificado na Cerita",
        orcamento: 350.0,
        gasto: 210.0,
        status: "ativa",
        tipo: "display",
        impressoes: 28400,
        cliques: 960,
        inicioEm: new Date("2026-06-05"),
        fimEm: new Date("2026-06-30"),
        anuncianteId: anunciantes[4].id,
      },
    }),
  ]);

  console.log("Criando transações...");

  const TAXA_FIXA = 2.99;

  await Promise.all([
    prisma.transacao.create({
      data: {
        descricao: "Ativação de destaque — Cleia M.",
        valor: 500.0,
        taxaProcessamento: TAXA_FIXA,
        totalCobrado: 500.0 + TAXA_FIXA,
        tipo: "ativacao",
        status: "aprovada",
        anuncianteId: anunciantes[0].id,
        campanhaId: campanhas[0].id,
      },
    }),
    prisma.transacao.create({
      data: {
        descricao: "Recarga de saldo — Cleia M.",
        valor: 1000.0,
        taxaProcessamento: TAXA_FIXA,
        totalCobrado: 1000.0 + TAXA_FIXA,
        tipo: "recarga",
        status: "aprovada",
        anuncianteId: anunciantes[0].id,
      },
    }),
    prisma.transacao.create({
      data: {
        descricao: "Ativação de destaque — Frianca A.",
        valor: 400.0,
        taxaProcessamento: TAXA_FIXA,
        totalCobrado: 400.0 + TAXA_FIXA,
        tipo: "ativacao",
        status: "aprovada",
        anuncianteId: anunciantes[1].id,
        campanhaId: campanhas[1].id,
      },
    }),
    prisma.transacao.create({
      data: {
        descricao: "Recarga de saldo — Tatiana B.",
        valor: 2000.0,
        taxaProcessamento: TAXA_FIXA,
        totalCobrado: 2000.0 + TAXA_FIXA,
        tipo: "recarga",
        status: "aprovada",
        anuncianteId: anunciantes[2].id,
      },
    }),
    prisma.transacao.create({
      data: {
        descricao: "Ativação de perfil Premium — Tatiana B.",
        valor: 1200.0,
        taxaProcessamento: TAXA_FIXA,
        totalCobrado: 1200.0 + TAXA_FIXA,
        tipo: "ativacao",
        status: "aprovada",
        anuncianteId: anunciantes[2].id,
        campanhaId: campanhas[2].id,
      },
    }),
    prisma.transacao.create({
      data: {
        descricao: "Recarga de saldo — Priscila M.",
        valor: 5000.0,
        taxaProcessamento: TAXA_FIXA,
        totalCobrado: 5000.0 + TAXA_FIXA,
        tipo: "recarga",
        status: "aprovada",
        anuncianteId: anunciantes[5].id,
      },
    }),
    prisma.transacao.create({
      data: {
        descricao: "Ativação de destaque — Vanessa K.",
        valor: 350.0,
        taxaProcessamento: TAXA_FIXA,
        totalCobrado: 350.0 + TAXA_FIXA,
        tipo: "ativacao",
        status: "aprovada",
        anuncianteId: anunciantes[4].id,
        campanhaId: campanhas[4].id,
      },
    }),
    prisma.transacao.create({
      data: {
        descricao: "Recarga de saldo — Renata S.",
        valor: 600.0,
        taxaProcessamento: TAXA_FIXA,
        totalCobrado: 600.0 + TAXA_FIXA,
        tipo: "recarga",
        status: "pendente",
        anuncianteId: anunciantes[3].id,
      },
    }),
  ]);

  console.log("✅ Seed concluído com sucesso!");
  console.log(`   ${anunciantes.length} anunciantes criados`);
  console.log(`   ${campanhas.length} campanhas criadas`);
  console.log("   7 transações criadas");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
