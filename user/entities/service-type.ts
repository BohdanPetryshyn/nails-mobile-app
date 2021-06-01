export enum ServiceType {
  REMOVAL = 'REMOVAL',
  CLEANING = 'CLEANING',
  COATING = 'COATING',
  DESIGN = 'DESIGN',
  BUILD_UP = 'BUILD_UP',
  REINFORCEMENT = 'REINFORCEMENT',
  FRENCH = 'FRENCH',
  PEDICURE = 'PEDICURE',
}

export const SERVICE_TYPE_LABELS = {
  [ServiceType.REMOVAL]: 'Зняття',
  [ServiceType.CLEANING]: 'Чистка',
  [ServiceType.COATING]: 'Покриття',
  [ServiceType.DESIGN]: 'Дизайн',
  [ServiceType.BUILD_UP]: 'Нарощення',
  [ServiceType.REINFORCEMENT]: 'Укріплення',
  [ServiceType.FRENCH]: 'Французький манікюр',
  [ServiceType.PEDICURE]: 'Педикюр',
};
