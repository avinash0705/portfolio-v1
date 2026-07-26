type ContactMethodsProps = {
  email: string;
  linkedIn: string;
  github: string;
};

const linkClassName =
  "relative text-accent after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-150 after:ease-[cubic-bezier(0.16,1,0.3,1)] after:content-[''] hover:after:scale-x-100 motion-reduce:after:transition-none";

/**
 * 008-component-library.md, Section 11 (exception). Exactly three
 * methods, fixed render order, always presented together — never a
 * variant, never a fourth channel added by this component itself
 * (019-contact.md, Section 4).
 *
 * Text-only labels: 006-design-system.md's iconography policy requires
 * any icon to be paired with a label, never icon-alone, but doesn't
 * mandate an icon exist — no icon library has been chosen for this
 * project, and adding one solely for this component isn't justified.
 *
 * LinkedIn and GitHub open in a new tab and are marked as external
 * (027-application-behaviour.md, Section 4); Email is a mailto: action,
 * not navigation away from the site, so it stays in the same tab with
 * no external marker.
 */
export function ContactMethods({
  email,
  linkedIn,
  github,
}: ContactMethodsProps) {
  return (
    <ul className="flex flex-col gap-2 text-sm">
      <li>
        <a href={`mailto:${email}`} className={linkClassName}>
          Email
        </a>
      </li>
      <li>
        <a
          href={linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
        >
          LinkedIn<span className="sr-only"> (opens in a new tab)</span>
        </a>
      </li>
      <li>
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
        >
          GitHub<span className="sr-only"> (opens in a new tab)</span>
        </a>
      </li>
    </ul>
  );
}
