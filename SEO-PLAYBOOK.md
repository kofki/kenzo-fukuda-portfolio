# Owning the search results for "Kenzo Fukuda"

Goal: when someone searches **Kenzo Fukuda**, the first page is you: this site,
LinkedIn, GitHub, BeachLens, press. The other people with this name (a
materials-science researcher in Japan, a Nissan Chemical patent holder, and a
videographer who owns kenzofukuda.com) cannot be removed from Google. They can
be pushed to page two, which is the same thing in practice.

Two rules that make everything else work:

1. **Exactly "Kenzo Fukuda" everywhere.** Never "Kenzo O. Fukuda" or
   "Fukuda Koike" on a public profile. Variants split you into separate entities.
2. **Same headshot, same one-liner, same link on every profile.** Use
   `public/kenzo_headshot.jpg` and
   *"Co-Founder & CTO of BeachLens · Software Engineer · CS @ University of Florida"*
   with a link to https://www.kfukuda.com. Google builds entities from consistency.

Every time you create a profile below, add its URL to `profiles` in
`portfolio-app/data/profile.ts` so it lands in the Person schema `sameAs` and
the `rel="me"` links, then redeploy.

## Tier 1: this week (you control all of these)

- [ ] **Google Search Console**: add `kfukuda.com` as a domain property, submit
      `https://www.kfukuda.com/sitemap.xml`, then use URL Inspection to request
      indexing for `/`, `/about`, `/writing` and each post.
- [ ] **Bing Webmaster Tools**: import the site from Search Console (one click).
      Bing feeds Copilot and ChatGPT search.
- [ ] **beachlens.net**: add a Team/About page that says "Kenzo Fukuda,
      Co-Founder & CTO" with the headshot, a two-sentence bio, and a link to
      kfukuda.com. Add Organization JSON-LD on BeachLens with
      `founder` entries for both founders and each founder's `sameAs` pointing
      at their own site. This is the single strongest signal available: the
      company's own site vouching for you.
- [ ] **App Store / Google Play**: if the listing copy is yours, mention
      "built by co-founders Ja'rell Felix and Kenzo Fukuda at the University of
      Florida" in the description.
- [ ] **LinkedIn**: headline "Co-Founder & CTO @ BeachLens | CS @ University of
      Florida"; website field → kfukuda.com; About section opens with your full
      name; headshot matches.
- [ ] **GitHub** (`kofki`): display name "Kenzo Fukuda", bio, website →
      kfukuda.com, headshot. Create the `kofki/kofki` profile README with the
      same one-liner and links. Pin BeachLens-related repos.
- [ ] **X/Twitter**: claim `@kenzofukuda` (or closest). Same bio, link, headshot.
      Then set `twitter.creator` in `app/layout.tsx` and add the URL to `profiles`.
- [ ] **Crunchbase**: create a person profile "Kenzo Fukuda, Co-Founder & CTO,
      BeachLens" and the BeachLens organization if it is missing.
- [ ] **Devpost**: make sure the profile name is the full name, it links to
      kfukuda.com, and the CaseForward AI (SwampHacks XI winner) and Subscriptos
      projects list you.

## Tier 2: next 2 to 6 weeks (get other sites to say it)

- [ ] **UF channels**: pitch the BeachLens story to UF CISE news, Herbert
      Wertheim College of Engineering news, UF News (news.ufl.edu), The
      Independent Florida Alligator, and WUFT. Angle: "UF CS student co-founder
      and CTO scales beach-safety app to 20,000+ users." The FOX 13 story proves
      it is newsworthy. A `.edu` page naming you with your title is the most
      authoritative link you can get.
- [ ] **Local press**: Gainesville Sun, Florida Trend, Tampa Bay Business
      Journal, Orlando Sentinel. Ask every reporter to use the full name and
      title and to link kfukuda.com.
- [ ] **Product Hunt**: launch BeachLens with you listed as a Maker.
- [ ] **Show HN**: "Show HN: BeachLens, real-time beach conditions app (20k
      users)" from an account that uses your real name in its profile.
- [ ] **Dev.to, Hashnode, Medium**: republish each `/writing` post with the
      canonical URL set to the kfukuda.com post. High-authority domains that
      rank for author names.
- [ ] **YouTube**: a 3-minute "How we built BeachLens" demo. Title and
      description include "Kenzo Fukuda, Co-Founder & CTO".
- [ ] **Podcasts / interviews**: UF Innovate, Startup Gainesville, student
      founder podcasts. Each episode page is another entity mention.

## Tier 3: ongoing

- [ ] Publish on `/writing` twice a month (add an object to
      `portfolio-app/data/writing.ts`) and cross-post with canonical links.
- [ ] After 3+ press mentions, create a **Wikidata** item: human; occupation
      software engineer, entrepreneur; employer BeachLens; educated at
      University of Florida; official website; described by source: the press
      URLs. Wikidata is the usual seed for a Knowledge Panel. Do not create a
      Wikipedia article yet; it will be deleted for notability.
- [ ] When a Knowledge Panel appears, claim it ("Claim this knowledge panel"
      link under the panel) to control the photo and description.
- [ ] Optional: register **kenzofukuda.dev** (available as of Nov 2026) and
      308-redirect it to www.kfukuda.com so the exact-match domain is yours.

## Tracking

Weekly, in an incognito window, search "Kenzo Fukuda", "Kenzo Fukuda
BeachLens", "Kenzo Fukuda UF". Log the position of kfukuda.com, LinkedIn,
GitHub, and beachlens.net. Targets: top 3 for the bare name within 4 weeks;
5+ of the 10 page-one results yours within 3 months; Knowledge Panel and
autocomplete within 3 to 6 months.

## What not to do

No fake reviews, directory spam, bought links, fake DMCA or legal notices, or
anything aimed at the other Kenzo Fukudas' pages. Those get kfukuda.com
penalized and would not work anyway.
