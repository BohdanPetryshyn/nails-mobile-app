export enum ServiceType {
  REMOVAL = 'REMOVAL',
  CLEANING = 'CLEANING',
  COATING = 'COATING',
}

export const SERVICE_TYPE_LABELS = {
  [ServiceType.REMOVAL]: 'Зняття',
  [ServiceType.CLEANING]: 'Чистка',
  [ServiceType.COATING]: 'Покриття',
};
