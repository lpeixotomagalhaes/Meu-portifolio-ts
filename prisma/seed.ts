import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log("Limpando banco antigo...");
  await prisma.skill.deleteMany();
  await prisma.project.deleteMany();

  console.log("Injetando Projeto Regatinhos Unifor...");
  await prisma.project.create({
    data: {
      title: "Regatinhos Unifor",
      slug: "regatinhos-unifor",
      subtitle: "Plataforma de Adoção e Cuidados Felinos",
      shortDesc: "Projeto voltado para o resgate, adoção e cuidados de gatos no campus da Unifor, conectando voluntários e adotantes.",
      longDesc: "O Regatinhos Unifor nasceu da necessidade de dar um lar e cuidados adequados aos gatos que vivem no campus. Desenvolvemos uma plataforma completa onde estudantes e funcionários podem reportar felinos encontrados, se voluntariar para alimentação e, o mais importante, iniciar um processo seguro de adoção.",
      coverImage: "/projetos/regatinhos-capa.jpg", // Depois você coloca a foto real na pasta public
      aboutImage: "/projetos/regatinhos-about.jpg",
    }
  });

  console.log("Injetando 8 Skills Simétricas...");
  const skills = [
    { name: "Next.js", description: "O motor principal do site. Permite carregar as páginas na velocidade da luz, garantindo a melhor performance." },
    { name: "TypeScript", description: "A armadura do código. Adiciona regras rígidas que evitam bugs e quebras antes mesmo de o site ir ao ar." },
    { name: "NestJS", description: "O cérebro dos bastidores. Um framework robusto para criar a API e a lógica complexa do servidor." },
    { name: "PostgreSQL", description: "Banco de dados relacional de alto nível. É o cofre super seguro onde guardamos todas as informações." },
    { name: "Tailwind CSS", description: "Minha ferramenta de pintura ágil. Permite estilizar o site inteiro com precisão milimétrica e responsiva." },
    { name: "Framer Motion", description: "A mágica visual. Biblioteca poderosa que dá vida e fluidez às animações e transições do site." },
    { name: "Node.js", description: "O ambiente de execução que permite que o servidor aguente milhares de acessos simultâneos sem travar." },
    { name: "UX/UI Design", description: "A arquitetura da experiência. Garanto que além de bonito, o site seja extremamente fácil e intuitivo de usar." }
  ];

  for (const skill of skills) {
    await prisma.skill.create({ data: skill });
  }

  console.log("Tudo pronto! Banco de Dados atualizado. 🚀");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });