// ─────────────────────────────────────────────────────────
//  DHB Davilas — Shared TypeScript Types
// ─────────────────────────────────────────────────────────

export type Role = 'ADMIN' | 'STYLIST' | 'CLIENT';
export type AppointmentStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED' | 'NO_SHOW';
export type PaymentStatus = 'UNPAID' | 'PAID' | 'REFUNDED' | 'PARTIAL';
export type PaymentMethod = 'CASH' | 'CARD' | 'TRANSFER' | 'OTHER';
export type MediaType = 'IMAGE' | 'VIDEO';

// ─── User ─────────────────────────────────────────────────

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  role: Role;
  avatarUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserInput {
  name: string;
  email: string;
  passwordHash: string;
  phone?: string;
  role?: Role;
  avatarUrl?: string;
}

export interface UpdateUserInput {
  name?: string;
  email?: string;
  passwordHash?: string;
  phone?: string;
  role?: Role;
  avatarUrl?: string;
}

// ─── Client ───────────────────────────────────────────────

export interface Client {
  id: number;
  userId: number;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateClientInput {
  userId: number;
  notes?: string;
}

export interface UpdateClientInput {
  notes?: string;
}

// ─── Stylist ──────────────────────────────────────────────

export interface Stylist {
  id: number;
  userId: number;
  bio?: string | null;
  specialties?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateStylistInput {
  userId: number;
  bio?: string;
  specialties?: string;
}

export interface UpdateStylistInput {
  bio?: string;
  specialties?: string;
}

// ─── Service ──────────────────────────────────────────────

export interface Service {
  id: number;
  name: string;
  description?: string | null;
  price: number;
  durationMin: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateServiceInput {
  name: string;
  description?: string;
  price: number;
  durationMin: number;
  isActive?: boolean;
}

export interface UpdateServiceInput {
  name?: string;
  description?: string;
  price?: number;
  durationMin?: number;
  isActive?: boolean;
}

// ─── Availability ─────────────────────────────────────────

export interface Availability {
  id: number;
  stylistId: number;
  date: Date;
  startTime: Date;
  endTime: Date;
  isBooked: boolean;
  createdAt: Date;
}

export interface CreateAvailabilityInput {
  stylistId: number;
  date: string;       // ISO date string e.g. "2025-06-01"
  startTime: string;  // e.g. "09:00"
  endTime: string;    // e.g. "17:00"
}

export interface UpdateAvailabilityInput {
  date?: string;
  startTime?: string;
  endTime?: string;
  isBooked?: boolean;
}

// ─── Appointment ──────────────────────────────────────────

export interface Appointment {
  id: number;
  clientId: number;
  stylistId: number;
  availabilityId?: number | null;
  scheduledAt: Date;
  status: AppointmentStatus;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAppointmentInput {
  clientId: number;
  stylistId: number;
  availabilityId?: number;
  scheduledAt: string;
  notes?: string;
}

export interface UpdateAppointmentInput {
  scheduledAt?: string;
  status?: AppointmentStatus;
  notes?: string;
}

// ─── AppointmentService ───────────────────────────────────

export interface AppointmentService {
  id: number;
  appointmentId: number;
  serviceId: number;
  priceAtTime: number;
}

export interface CreateAppointmentServiceInput {
  appointmentId: number;
  serviceId: number;
  priceAtTime: number;
}

// ─── Payment ──────────────────────────────────────────────

export interface Payment {
  id: number;
  appointmentId: number;
  clientId: number;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  paidAt?: Date | null;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePaymentInput {
  appointmentId: number;
  clientId: number;
  amount: number;
  method?: PaymentMethod;
  status?: PaymentStatus;
  notes?: string;
}

export interface UpdatePaymentInput {
  amount?: number;
  method?: PaymentMethod;
  status?: PaymentStatus;
  paidAt?: string;
  notes?: string;
}

// ─── Product ──────────────────────────────────────────────

export interface Product {
  id: number;
  name: string;
  description?: string | null;
  price: number;
  stock: number;
  imageUrl?: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProductInput {
  name: string;
  description?: string;
  price: number;
  stock?: number;
  imageUrl?: string;
  isActive?: boolean;
}

export interface UpdateProductInput {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  imageUrl?: string;
  isActive?: boolean;
}

// ─── Post ─────────────────────────────────────────────────

export interface Post {
  id: number;
  authorId: number;
  title?: string | null;
  caption?: string | null;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePostInput {
  authorId: number;
  title?: string;
  caption?: string;
  isPublished?: boolean;
}

export interface UpdatePostInput {
  title?: string;
  caption?: string;
  isPublished?: boolean;
}

// ─── Media ────────────────────────────────────────────────

export interface Media {
  id: number;
  postId: number;
  url: string;
  type: MediaType;
  altText?: string | null;
  order: number;
  createdAt: Date;
}

export interface CreateMediaInput {
  postId: number;
  url: string;
  type?: MediaType;
  altText?: string;
  order?: number;
}

export interface UpdateMediaInput {
  url?: string;
  type?: MediaType;
  altText?: string;
  order?: number;
}

// ─── API Response wrapper ─────────────────────────────────

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}
