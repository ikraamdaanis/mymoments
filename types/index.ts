export interface TimelineEvent extends Record<string, unknown> {
  id: string;
  date: Date;
  title: string;
  description: string;
  category: "life-event" | "regular-event";
}
