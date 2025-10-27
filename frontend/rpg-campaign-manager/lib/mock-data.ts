import type { Campanha, Personagem, Usuario } from "./types"

export const mockUsuarios: Usuario[] = [
  {
    id: "u1",
    nome: "Mestre Gabriel",
    email: "mestre@rpg.com",
    tipo: "mestre",
  },
  {
    id: "u2",
    nome: "Ana Silva",
    email: "ana@rpg.com",
    tipo: "jogador",
  },
  {
    id: "u3",
    nome: "Carlos Mendes",
    email: "carlos@rpg.com",
    tipo: "jogador",
  },
  {
    id: "u4",
    nome: "Beatriz Costa",
    email: "beatriz@rpg.com",
    tipo: "jogador",
  },
]

export const mockCampanhas: Campanha[] = [
  {
    id: "c1",
    nome: "A Queda de Eldoria",
    descricao: "Uma campanha épica onde heróis devem salvar o reino de Eldoria da invasão demoníaca.",
    mestreId: "u1",
    jogadorIds: ["u2", "u3", "u4"],
    dataCriacao: "2025-01-15",
    status: "ativa",
    imagemUrl: "/fantasy-castle-dark-sky.jpg",
  },
  {
    id: "c2",
    nome: "Mistérios de Ravenloft",
    descricao: "Horror gótico em um reino de névoas e vampiros.",
    mestreId: "u1",
    jogadorIds: ["u2", "u3"],
    dataCriacao: "2024-11-20",
    status: "pausada",
    imagemUrl: "/gothic-castle-fog.jpg",
  },
  {
    id: "c3",
    nome: "Aventuras em Waterdeep",
    descricao: "Intrigas políticas e aventuras urbanas na maior cidade da Costa da Espada.",
    mestreId: "u1",
    jogadorIds: ["u4"],
    dataCriacao: "2024-09-10",
    status: "concluida",
    imagemUrl: "/medieval-city-harbor.jpg",
  },
]

export const mockPersonagens: Personagem[] = [
  {
    id: "p1",
    nome: "Thorin Escudo de Ferro",
    tipo: "PC",
    classe: "Guerreiro",
    raca: "Anão",
    campanhaId: "c1",
    jogadorId: "u2",
    avatarUrl: "/dwarf-warrior.png",
    ficha: {
      id: "f1",
      personagemId: "p1",
      pontosVidaAtual: 45,
      pontosVidaMax: 58,
      sanidadeAtual: 80,
      sanidadeMax: 100,
      nivel: 5,
      atributos: {
        forca: 18,
        destreza: 12,
        constituicao: 16,
        inteligencia: 10,
        sabedoria: 13,
        carisma: 8,
      },
      inventario: [
        { id: "i1", nome: "Machado de Batalha +1", descricao: "Arma mágica forjada pelos anões", quantidade: 1 },
        { id: "i2", nome: "Poção de Cura", descricao: "Restaura 2d4+2 pontos de vida", quantidade: 3 },
        { id: "i3", nome: "Armadura de Placas", descricao: "CA 18", quantidade: 1 },
      ],
      historia: "Thorin é um guerreiro anão exilado de seu clã, buscando redimir sua honra através de grandes feitos.",
    },
  },
  {
    id: "p2",
    nome: "Elara Folha da Lua",
    tipo: "PC",
    classe: "Maga",
    raca: "Elfa",
    campanhaId: "c1",
    jogadorId: "u3",
    avatarUrl: "/elf-wizard.jpg",
    ficha: {
      id: "f2",
      personagemId: "p2",
      pontosVidaAtual: 28,
      pontosVidaMax: 32,
      sanidadeAtual: 65,
      sanidadeMax: 90,
      nivel: 5,
      atributos: {
        forca: 8,
        destreza: 14,
        constituicao: 12,
        inteligencia: 18,
        sabedoria: 15,
        carisma: 13,
      },
      inventario: [
        { id: "i4", nome: "Grimório Arcano", descricao: "Contém 15 magias", quantidade: 1 },
        { id: "i5", nome: "Varinha de Mísseis Mágicos", descricao: "7 cargas restantes", quantidade: 1 },
        { id: "i6", nome: "Componentes de Magia", descricao: "Materiais diversos", quantidade: 1 },
      ],
      historia: "Elara deixou sua floresta natal para estudar as artes arcanas nas grandes bibliotecas do mundo.",
    },
  },
  {
    id: "p3",
    nome: "Kael Sombra Noturna",
    tipo: "PC",
    classe: "Ladino",
    raca: "Meio-Elfo",
    campanhaId: "c1",
    jogadorId: "u4",
    avatarUrl: "/rogue-halfelf.jpg",
    ficha: {
      id: "f3",
      personagemId: "p3",
      pontosVidaAtual: 38,
      pontosVidaMax: 40,
      sanidadeAtual: 90,
      sanidadeMax: 95,
      nivel: 5,
      atributos: {
        forca: 10,
        destreza: 18,
        constituicao: 14,
        inteligencia: 14,
        sabedoria: 12,
        carisma: 16,
      },
      inventario: [
        { id: "i7", nome: "Adaga Envenenada", descricao: "Causa dano adicional de veneno", quantidade: 2 },
        { id: "i8", nome: "Ferramentas de Ladrão", descricao: "Para abrir fechaduras", quantidade: 1 },
        { id: "i9", nome: "Capa da Invisibilidade", descricao: "1 uso por dia", quantidade: 1 },
      ],
      historia: "Kael cresceu nas ruas e aprendeu a sobreviver usando sua astúcia e habilidades furtivas.",
    },
  },
  {
    id: "p4",
    nome: "Barão Malachar",
    tipo: "NPC",
    classe: "Necromante",
    raca: "Humano",
    campanhaId: "c1",
    avatarUrl: "/evil-necromancer.jpg",
    ficha: {
      id: "f4",
      personagemId: "p4",
      pontosVidaAtual: 85,
      pontosVidaMax: 85,
      sanidadeAtual: 20,
      sanidadeMax: 100,
      nivel: 10,
      atributos: {
        forca: 10,
        destreza: 12,
        constituicao: 14,
        inteligencia: 20,
        sabedoria: 16,
        carisma: 14,
      },
      inventario: [
        { id: "i10", nome: "Cajado dos Mortos", descricao: "Artefato necromântico poderoso", quantidade: 1 },
        { id: "i11", nome: "Livro dos Mortos", descricao: "Grimório proibido", quantidade: 1 },
      ],
      historia:
        "O principal antagonista da campanha, um necromante que busca conquistar Eldoria com um exército de mortos-vivos.",
    },
  },
  {
    id: "p5",
    nome: "Innkeeper Tobias",
    tipo: "NPC",
    classe: "Plebeu",
    raca: "Humano",
    campanhaId: "c1",
    avatarUrl: "/friendly-innkeeper.jpg",
    ficha: {
      id: "f5",
      personagemId: "p5",
      pontosVidaAtual: 12,
      pontosVidaMax: 12,
      sanidadeAtual: 100,
      sanidadeMax: 100,
      nivel: 1,
      atributos: {
        forca: 10,
        destreza: 10,
        constituicao: 12,
        inteligencia: 10,
        sabedoria: 12,
        carisma: 14,
      },
      inventario: [{ id: "i12", nome: "Avental", descricao: "Roupa de trabalho", quantidade: 1 }],
      historia: 'Dono da taverna "O Dragão Dourado", sempre disposto a ajudar aventureiros com informações.',
    },
  },
]

// Helper functions
export function getCampanhasByMestre(mestreId: string): Campanha[] {
  return mockCampanhas.filter((c) => c.mestreId === mestreId)
}

export function getCampanhasByJogador(jogadorId: string): Campanha[] {
  return mockCampanhas.filter((c) => c.jogadorIds.includes(jogadorId))
}

export function getPersonagensByCampanha(campanhaId: string): Personagem[] {
  return mockPersonagens.filter((p) => p.campanhaId === campanhaId)
}

export function getPersonagemByJogador(jogadorId: string, campanhaId: string): Personagem | undefined {
  return mockPersonagens.find((p) => p.jogadorId === jogadorId && p.campanhaId === campanhaId)
}

export function getUsuarioById(id: string): Usuario | undefined {
  return mockUsuarios.find((u) => u.id === id)
}
