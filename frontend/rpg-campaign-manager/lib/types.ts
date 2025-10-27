export type CharacterType = "PC" | "NPC"

export interface Item {
  id: string
  nome: string
  descricao: string
  quantidade: number
}

export interface Atributos {
  forca: number
  destreza: number
  constituicao: number
  inteligencia: number
  sabedoria: number
  carisma: number
}

export interface Ficha {
  id: string
  personagemId: string
  pontosVidaAtual: number
  pontosVidaMax: number
  sanidadeAtual: number
  sanidadeMax: number
  atributos: Atributos
  inventario: Item[]
  historia: string
  nivel: number
}

export interface Personagem {
  id: string
  nome: string
  tipo: CharacterType
  classe: string
  raca: string
  campanhaId: string
  jogadorId?: string // Only for PCs
  ficha: Ficha
  avatarUrl?: string
}

export interface Campanha {
  id: string
  nome: string
  descricao: string
  mestreId: string
  jogadorIds: string[]
  dataCriacao: string
  status: "ativa" | "pausada" | "concluida"
  imagemUrl?: string
}

export interface Usuario {
  id: string
  nome: string
  email: string
  tipo: "mestre" | "jogador"
}
