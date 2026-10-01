# 13. Form integrations: Formspree and Brevo

The site is static: it has no server, database or login. Every form sends its data straight from the visitor's browser to a third-party service. Two environment variables, set where the site is built, switch them on. Both values are public (they appear in the page HTML), so no secret goes in them.

| Forms | Service | Variable |
|---|---|---|
| Join, Contact, Event registration | Formspree | `PUBLIC_FORMSPREE_ENDPOINT` |
| Newsletter ("Get updates" in the footer) | Brevo | `PUBLIC_BREVO_FORM_URL` |

If a variable is empty, Join, Contact and Event forms show a "not accepting submissions yet" notice with a disabled button, and the newsletter box is hidden. A value on the wrong domain stops the build with an error.

## Formspree (Join, Contact, Event registration)

1. Create a Formspree account and one form. Set its notification email to the movement's inbox ([PLACEHOLDER: owner inbox]).
2. Copy the form endpoint, `https://formspree.io/f/<id>`, into `PUBLIC_FORMSPREE_ENDPOINT`.
3. In the form's settings, add the site's domain to the allowed domains if the plan offers it, and set the redirect after submission to `/thanks/` (used when JavaScript is off).
4. What the site sends: `form` (join, contact or event), `_subject`, the person's fields, `email` when they gave an email address (so a reply goes to them), and an empty `_gotcha` honeypot. Formspree silently drops any submission where `_gotcha` is filled in.
5. All three forms arrive in one Formspree form; the `form` field and the subject line tell them apart.

## Brevo (newsletter)

1. In Brevo, create a contact list for the newsletter.
2. Create a sign-up form for that list and turn on **double confirmation**. Without it, the message the site shows ("we will email you to confirm your address") would be untrue.
3. Customise the confirmation email in Brevo and make sure every email carries a working unsubscribe link ([PLACEHOLDER: sender name and address, registered organisation details for the email footer]).
4. Share the form as **Simple HTML** and copy the form's action URL, `https://<account>.sibforms.com/serve/<form-id>`, into `PUBLIC_BREVO_FORM_URL`. Add the site's domain to the form's allowed domains.
5. What the site sends: `EMAIL`, `locale`, `html_type=simple` and an empty `email_address_check` honeypot, as a standard form body.
6. Brevo does not return a reply the browser can read across sites, so the site shows its confirmation once the request is delivered, not once Brevo has accepted the address. If Brevo rejects the address, the person sees the thank-you but receives no confirmation email.

## Before launch

- Submit each form once on the live site and check the Formspree inbox and the Brevo contact list.
- Name Formspree and Brevo as processors in the privacy policy, with where each stores data ([PLACEHOLDER: provider data locations; legal review]).
- Check Formspree's and Brevo's current plan limits against expected traffic; free plans cap submissions.
