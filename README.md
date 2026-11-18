# waruinduati.com

The website for Warui Nduati, a brand strategist and creative director in Nairobi.

A static site with no build step, hosted on GitHub Pages at https://www.waruinduati.com.

## Structure

- `index.html` is the homepage: hero (with the avatar), about, practice, approach, Tale of Craft (portfolio preview and a link to Substack), endorsements, and conversations I welcome.
- `assets/img/warui-avatar.png` is the illustrated avatar at the centre of the hero.
- `assets/img/volume-5/` holds the twelve pages shown in the portfolio preview.
- `docs/tale-of-craft-volume-5.pdf` is the full portfolio, opened by the "Read the full volume" button. When Volume 6 is out, replace it and the preview pages.
- `assets/css/site.css` holds the WN brand system (palette, Ancizar Serif and Work Sans, spacing).
- `assets/js/site.js` runs the mobile menu, the contact form, and the draft switch described below.
- `thanks.html` and `404.html` are the confirmation and not-found pages.
- `CNAME` tells GitHub Pages to serve the site on www.waruinduati.com.

## Endorsements are drafts

The "In others' words" section carries placeholder quotes and names. It is marked `data-draft`, so it is hidden on www.waruinduati.com and only shows in previews. To launch it:

1. Replace each quote, name, and role with a real endorsement, in the person's own words and with their approval.
2. Delete the three "Ask:" lines and the draft banner.
3. Remove `data-draft` from the section.

## Substack

The Tale of Craft section ends with a single link to Warui's thoughts on Substack. It carries `data-substack`; replace `https://substack.com/` with the publication address.

## Updating the portfolio

When a new volume of Tale of Craft is ready, add the PDF to `docs/`, render the preview pages to `assets/img/`, and update the slides, the file size label, and the chapter list in `index.html`.

## Contact form

Messages go to the studio inbox through FormSubmit (formsubmit.co). The first message sent from the live site triggers a one-time activation email to that inbox. Click the link in it, and every message after that arrives normally.

## Fonts

Ancizar Serif and Work Sans are both under the SIL Open Font License and are self-hosted in `assets/fonts/`. Work Sans stands in for Miranda Sans, the brand's licensed body face.
