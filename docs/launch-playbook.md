# Gulfcoast Charm — Direct Booking Launch Playbook

A working plan for taking the house from one platform booking a year to a steady direct-booking business. Ordered by impact. Check items off as they land.

## 1. Why direct, in one paragraph

Airbnb moved US hosts to a single host-only service fee of about 15.5 percent of the booking subtotal in late 2026. To keep the same payout, hosts have to raise platform prices roughly 15 to 18 percent. A direct site lets the house sit at the honest price while the platform listing carries the markup. Every repeat guest, referral, and local group then books fee-free. Keep the platforms as paid advertising, not as the business.

## 2. The stack (about $40 a month)

| Piece | Tool | Why |
| --- | --- | --- |
| Website | GitHub Pages, this repository | Free, fast, already live at www.gulfcoastcharm.com |
| Booking engine | OwnerRez, about $40 a month | Live calendar, Stripe card payments, e-signed rental agreement, damage protection, channel manager that syncs Airbnb and VRBO so the house never double books |
| Forms until OwnerRez is live | Formspree, free tier | Three forms: stay requests, court rentals, group inquiries |
| Reviews | Google Business Profile | The only review channel you own; shows up in Maps for "volleyball court rental St. Petersburg" |
| Pricing | OwnerRez seasonal rules, or PriceLabs later | Weekend, holiday, spring training and tournament-week pricing |

### OwnerRez setup order
1. Create the account and the property. Upload the same photos the site uses.
2. Connect Stripe for payments.
3. Build the rental agreement with the court waiver inside it, so one e-signature covers both.
4. Set rates: base nightly, weekend uplift, pet fee, cleaning fee, minimum nights for peak weekends.
5. Settings → Widgets → create a Booking/Inquiry widget. Paste its property ID and widget ID into `js/site.js` under `GC.ownerrez`. The Stay page booking panel switches from the request form to live availability automatically.
6. Connect the Airbnb and VRBO calendars through the channel manager. Mark those listings up 18 percent over the direct rate.

## 3. Pricing position

- Market data for St. Pete Beach puts average nightly rates for whole homes around $300 with occupancy under 40 percent. Downtown St. Pete runs cheaper and busier. A private court for eight is a premium amenity nobody else lists, so price above the neighborhood and sell the per-person math on the site: at $400 a night, eight guests pay $50 each.
- Peak windows to price up: Spring Break (March), spring training (late February through March), AVP and local tournament weekends, Thanksgiving, Christmas to New Year, Memorial Day, Labor Day.
- Set a 2-night minimum normally, 3 nights on peak weekends, and allow 1-night court-only rentals on open weekdays.
- Fill the `nightlyFrom` value in `js/site.js` once rates are set so the site shows the starting rate and per-person number.

## 4. Guest experience that earns five stars and repeat bookings

**Before arrival**
- Automated message sequence in OwnerRez: booking confirmation, 7-day pre-arrival guide, day-before door code, morning-of check-in reminder.
- Digital guidebook (Hostfully or Touch Stay, or a free Google Doc) covering Wi-Fi, arcade, court rules, beach gear, trash day, quiet hours, and ten local recommendations.
- Ask every group one question at booking: "What is the occasion?" Then do one small thing for it.

**The court**
- Tournament balls in a rack, a ball pump, a scoreboard flip chart, a cooler of water on arrival.
- Court raked and lines set before every check-in. Photograph it. Guests notice.
- Shade: a cantilever umbrella or shade sail over the Adirondacks turns the lounge from a photo into a place people sit at 2 pm in July.
- Evening play: if the court is not lit, string lights or two LED floods on a timer extend play to 9 pm and respect quiet hours.

**The house**
- Welcome kit: local coffee, a bag of ice in the freezer, sunscreen, a printed one-page "first hour" card.
- Beach gear in a labeled bin by the door: chairs, umbrellas, cooler, a wagon.
- A five-star cleaning checklist with photos for the cleaner, especially the shower glass, under the arcade, and the dock.

**After checkout**
- Same-day thank-you message with a direct-booking discount code for next time (10 percent beats any platform).
- Ask for a Google review, with the link, 24 hours after checkout.
- Add the guest to an email list. Two emails a year: one for spring, one for fall.

## 5. Filling the calendar

In order of effort to payoff:

1. **Google Business Profile.** Create it as "Gulfcoast Charm, Vacation Home Rental" with the court photos. Post monthly. This is free, local, and almost nobody in the market does it well.
2. **The volleyball network.** The St. Pete Ballers Club, the beach volleyball leagues at Treasure Island and St. Pete Beach, local club coaches, and college club teams within driving distance. Offer a team rate and a referral fee. One coach booking three weekends a year is worth more than any ad.
3. **Tournament calendars.** Build a list of every beach tournament within 30 minutes and email organizers a month ahead offering the house to traveling teams.
4. **Instagram and TikTok built around the court.** Short clips of golden-hour games, the rake lines, the dock at sunrise. Tag the location. The court is visually unusual, which is what those feeds reward.
5. **Bachelorette planners.** St. Pete is a top bachelorette destination. Email the local planners and boat charter companies with a package: house, court afternoon, beach setup, keepsakes from The Charm Shop.
6. **Professional photography and drone.** A twilight shoot with the court lit, interiors staged, and a 30-second drone reel. Budget a few hundred dollars. This single purchase lifts the nightly rate more than any other.
7. **Platform listings as billboards.** Keep Airbnb and VRBO live at the marked-up price with the same photos and a line in the listing text: "Guests find us at Gulfcoast Charm dot com." Platform rules restrict direct links, so keep it to the brand name.

## 6. Ninety-day sequence

**Weeks 1 to 2**
- OwnerRez live, Stripe connected, agreement and waiver built, calendar synced.
- Formspree IDs in the site until then.
- Google Business Profile created and verified.
- Shopify moved to shop.gulfcoastcharm.com.

**Weeks 3 to 6**
- Pro photo and drone shoot. Swap images on the site.
- Guidebook written. Welcome kit sourced. Court shade and lighting decided.
- First outreach to Ballers Club, leagues, and three local coaches.

**Weeks 7 to 12**
- Tournament organizer emails sent for the coming season.
- Instagram posting twice a week from the court.
- First direct bookings reviewed on Google. Discount code live for repeat guests.
- Review the numbers: direct bookings, platform bookings, average nightly rate, occupancy. Adjust rates for the next quarter.

## 7. Things the site still needs from you

- Formspree IDs, or OwnerRez widget IDs, in `js/site.js`
- Starting nightly rate in `js/site.js`
- DBPR and county license numbers in the footer, if you want them displayed
- A read-through of `guide.html` and `docs/guest-guidebook.pdf`: strike any restaurant you would not send a friend to, add the two or three you would
- The blanks in `docs/guest-guidebook.html` (Wi-Fi, trash day, quiet hours, shutoffs, your return-guest code), then re-export the PDF
- Professional photos when available: the layout takes landscape images for heroes and 4:5 portraits for the split sections
