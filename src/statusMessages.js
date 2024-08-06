import { format } from "date-fns";

export function getStatusMessage(fields) {
  const { status, announcedDate, releasedDate } = fields;

  const formattedAnnouncedDate = announcedDate ? format(new Date(announcedDate), "MMM d") : null;
  const formattedReleasedDate = releasedDate ? format(new Date(releasedDate), "MMM d, yyyy") : null;
  const shortFormattedReleasedDate = releasedDate ? format(new Date(releasedDate), "MMM d") : null;

  switch (status) {
    case "rumored":
      return formattedAnnouncedDate ? `(Announcement expected ${formattedAnnouncedDate})` : "";
    case "announced":
      return `${formattedAnnouncedDate || ""}${
        shortFormattedReleasedDate ? ` (Releases ${shortFormattedReleasedDate})` : ""
      }`;
    case "released":
      return formattedReleasedDate || "";
    default:
      return "";
  }
}
