export interface TimelineEvent {
  id: string;
  date: Date;
  title: string;
  description: string;
  category: "life-event" | "regular-event";
}
