# gulfcoastcharm.com

Static site for Gulfcoast Charm, a direct-booking vacation rental in St. Petersburg, Florida. Hosted on GitHub Pages from the `main` branch at www.gulfcoastcharm.com.

## Structure

| Path | What it is |
| --- | --- |
| `index.html` | Home |
| `stay.html` | The House: gallery, amenities, booking panel, location, FAQ |
| `play.html` | The Court: private court rental |
| `celebrations.html` | Gather: teams, celebrations, families, group inquiry |
| `404.html` | Not-found page; forwards old Shopify paths to the shop subdomain |
| `css/style.css` | Design system and all styles |
| `js/site.js` | Configuration block plus header, mobile nav, lightbox, reveal, booking widget logic |
| `images/` | Property photos (`*.jpg`, `*.jpeg`) and three atmosphere images (`mood-*.jpg`) |
| `docs/launch-playbook.md` | Direct-booking strategy, setup order, guest experience, marketing plan |
| `CNAME` | Custom domain for GitHub Pages |

## Configuration

Everything that changes as services go live sits in one block at the top of `js/site.js`:

- `ownerrez.propertyId` and `ownerrez.widgetId`: when both are set, the Stay page booking panel switches from the request form to the live OwnerRez widget.
- `formspree.stay`, `formspree.court`, `formspree.gather`: Formspree form IDs for the three request forms.
- `nightlyFrom`: starting nightly rate. Shows the rate and the per-person figure on the booking panel. `null` hides both.
- `airbnb`, `vrbo`: listing URLs. Empty strings hide the platform notice.
- `mapEmbed`: Google Maps embed URL for the Stay page. Empty hides the map.
- `shop`: the shop URL used by every Shop link.

## Images

Atmosphere images (`images/mood-*.jpg`) are AI-generated concept imagery used only for full-bleed mood bands and the Gather hero. They do not depict the property. Every photo of the house and court is a real photo.

Replacing photos: heroes and mood bands want landscape images at least 1600px wide. The split-section images are shown at 4:5 portrait on desktop and 4:3 on mobile. The gallery mosaic accepts any orientation.

## Local preview

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.
