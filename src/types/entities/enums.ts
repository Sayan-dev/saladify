export enum GENDER_TYPE {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  NON_BINARY = 'NON_BINARY',
}

export enum AUTH_TYPE {
  GOOGLE = 'GOOGLE',
  FACEBOOK = 'FACEBOOK',
  EMAIL = 'EMAIL',
  PHONE = 'PHONE',
}

export enum INSTITUTE_COURSE_TYPE {
  SCHOOL = 'SCHOOL',
  COLLEGE = 'COLLEGE',
  UNIVERSITY = 'UNIVERSITY',
}

export enum INSTITUTE_TYPE {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

export enum BUSINESS_TYPES {
  PERSONAL = 'PERSONAL',
  FRANCHISE = 'FRANCHISE',
}

export enum BRAND_TYPES {
  SHOES = 'SHOES',
  WATCH = 'WATCH',
  MOBILE = 'MOBILE',
}

export enum PLANS {
  LAUNCH = 'LAUNCH',
  STANDARD = 'STANDARD',
  PREMIUM = 'PREMIUM',
  OTHER = 'OTHER',
}

export enum LANGUAGE {
  english = 'english',
  bengali = 'bengali',
  hindi = 'hindi',
}

export enum OrderEvent {
  take_order = 'take-order',
  prepare_order = 'prepare-order',
  picked_up_order = 'picked-up-order',
  received_order = 'received-order',
}
