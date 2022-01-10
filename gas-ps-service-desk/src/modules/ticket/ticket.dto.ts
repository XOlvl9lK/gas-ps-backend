export class CreateTicketDto {
  title: string;
  message: string;
  email?: string;
  file?: string;
}

export class UpdateTicketDto {
  id: number
  title: string;
  message: string;
  isOpen: boolean;
  email?: string;
  file?: string;
}