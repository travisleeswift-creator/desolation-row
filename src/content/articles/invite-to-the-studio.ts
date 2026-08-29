import type { Piece } from "../types";

export const article: Piece = {
  slug: "invite",
  kind: "article",
  kicker: "Invitation",
  title: "Invite to the Studio",
  dek: "A room with north light, a table, and no clipboard. Come if you make something that can stand up.",
  readMins: 2,
  free: false,
  order: 104,
  blocks: [
    {
      type: "p",
      text: "There is not, yet, a studio in the sense a landlord would recognise. There is a washed window I have been watching, and a table that could take a second chair, and an edition that needs more hands than a byline.",
    },
    {
      type: "p",
      text: "This is an invitation, not a programme. I am not recruiting beneficiaries. I am not offering a workshop with a certificate. If you write, print, repair, photograph, or otherwise make a thing that can stand in daylight without a halo, I would like to know.",
    },
    {
      type: "pull",
      text: "I am not recruiting beneficiaries. I am asking who wants a table without a clipboard.",
    },
    {
      type: "p",
      text: "The rules would be few. No press officers on the furniture. No case studies. Pay when there is pay; honesty when there is not. The edition stays an edition, not a brand that uses Luton as a backdrop for a pitch deck.",
    },
    {
      type: "p",
      text: "If the unit comes off, you will hear. If it does not, the invite still stands in the cheaper room: this paper, these pages, a desk that can move. Send work, or send a correction, or send the name of a bus that still runs when the timetable has given up.",
    },
    {
      type: "p",
      text: "I will be at the station approach on the next wet evening because that is where the front page still is. You do not need an appointment to walk the same ground. If you want the table, say so. If you only want the pages, you already have them. That is the whole of the invitation. It is not a gala. It is a window, a chair, and the chance to do trade instead of alms.",
    },
  ],
};
