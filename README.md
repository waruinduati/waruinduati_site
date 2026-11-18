# waruinduati.com

The website for Warui Nduati, a brand strategist and creative director in Nairobi.

A static site with no build step, hosted on GitHub Pages at https://www.waruinduati.com.

## Structure

- `index.html` is the homepage: hero, about, practice, approach, portfolio (Tale of Craft), notes, endorsements, and conversations I welcome.
- `notes/` holds the note pages, essays from Tale of Craft published as short web reads.
- `docs/tale-of-craft-volume-5.pdf` is the portfolio itself, opened by every "Read Volume 5" link.
- `assets/css/site.css` holds the WN brand system (palette, Ancizar Serif and Work Sans, spacing).
- `assets/js/site.js` runs the mobile menu, the contact form, and the draft switch described below.
- `thanks.html` and `404.html` are the confirmation and not-found pages.
- `CNAME` tells GitHub Pages to serve the site on www.waruinduati.com.

## Endorsements are drafts

The "In others' words" section carries placeholder quotes and names. It is marked `data-draft`, so it is hidden on www.waruinduati.com and only shows in previews. To launch it:

1. Replace each quote, name, and role with a real endorsement, in the person's own words and with their approval.
2. Delete the three "Ask:" lines and the draft banner.
3. Remove `data-draft` from the section.

## Adding a note

Copy one of the files in `notes/`, change the title, text, and canonical URL, then add a card for it in the Notes section of `index.html` and a line in `sitemap.xml`.

## Updating the portfolio

When a new volume of Tale of Craft is ready, add the PDF to `docs/`, render its cover to `assets/img/`, and update the links, the file size label, and the chapter list in `index.html` and the note pages.

## Contact form

Messages go to the studio inbox through FormSubmit (formsubmit.co). The first message sent from the live site triggers a one-time activation email to that inbox. Click the link in it, and every message after that arrives normally.

## Fonts

Ancizar Serif and Work Sans are both under the SIL Open Font License and are self-hosted in `assets/fonts/`. Work Sans stands in for Miranda Sans, the brand's licensed body face.
