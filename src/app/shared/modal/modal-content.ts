export interface ModalContent {
  title: string;
  message?: string;
  closable?: boolean;
  confirmationMessage?: string;
  displaySpinner?: boolean;
  answerable?: boolean;
  answerTrue?: string;
  answerFalse?: string;
}
