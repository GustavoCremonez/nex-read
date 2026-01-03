/**
 * Status de leitura de um livro na biblioteca do usuário
 *
 * Deve corresponder ao enum ReadingStatus do back-end
 */
export enum ReadingStatus {
  WantToRead = 1,
  Reading = 2,
  Read = 3,
}

/**
 * Labels descritivos para cada status de leitura
 */
export const ReadingStatusLabels: Record<ReadingStatus, string> = {
  [ReadingStatus.WantToRead]: 'Quero Ler',
  [ReadingStatus.Reading]: 'Lendo',
  [ReadingStatus.Read]: 'Lido',
};
