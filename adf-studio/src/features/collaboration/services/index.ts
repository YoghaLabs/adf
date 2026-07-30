import { studioSdk } from "@/sdk";

export const collaborationServices = {
  overview: () => studioSdk.collaboration.overview(),
  participants: () => studioSdk.participants.list(),
  presence: () => studioSdk.presence.list(),
  reviews: () => studioSdk.reviews.list(),
  notifications: () => studioSdk.notifications.list(),
  assignments: () => studioSdk.assignments.list(),
};

export * from "@/features/collaboration/services/collaborationFixtures";
