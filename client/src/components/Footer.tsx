import littleRockLogo from "../assets/svg/littleRockLogoNoBg.svg";
import facebook from "../assets/svg/social-icons/facebook.svg";
import instagram from "../assets/svg/social-icons/instagram.svg";
import tiktok from "../assets/svg/social-icons/tiktok.svg";

const socialIcons = [
  {
    logoSrc: facebook,
    logoLink: "https://facebook.com",
    logoAlt: "facebook",
  },
  {
    logoSrc: instagram,
    logoLink: "https://instagram.com",
    logoAlt: "instagram",
  },
  {
    logoSrc: tiktok,
    logoLink: "https://tiktok.com",
    logoAlt: "tiktok",
  },
];

const quicklinks = [
  {
    linkName: "Veracross",
    linkHref: "#",
  },
  {
    linkName: "Summer at Blake",
    linkHref: "#",
  },
  {
    linkName: "Maps and Directions",
    linkHref: "#",
  },
  {
    linkName: "Bearwears",
    linkHref: "#",
  },
  {
    linkName: "Employment",
    linkHref: "#",
  },
  {
    linkName: "Website Feedback",
    linkHref: "#",
  },
  {
    linkName: "Athletic Sideline Store",
    linkHref: "#",
  },
  {
    linkName: "Breakthrough Minneapolics at Blake",
    linkHref: "#",
  },
];

function Footer() {
  return (
    <footer className="flex absolute right-0 left-16 z-10 text-littleRockWhite-500">
      {/* social links */}
      <div className="bg-littleRockBlue-600 p-9 flex flex-col gap-20 justify-center">
        {socialIcons.map((socialIcon, index) => (
          <a key={index} href={socialIcon.logoLink} className="cursor-pointer">
            <img
              src={socialIcon.logoSrc}
              alt={socialIcon.logoAlt}
              className="h-7 w-7"
            />
          </a>
        ))}
      </div>
      {/* footer */}
      <div className="bg-littleRockBlue-500 flex-1 p-16 ">
        {/* footer links and address */}
        <div>
          <img src={littleRockLogo} alt="" className="h-20 w-auto mb-10" />
        </div>
        <div className="flex justify-between pb-10 border-b ">
          {/* logo and addresses */}
          <div className="flex flex-col gap-5">
            <h2 className="text-2xl font-calluna underline underline-offset-8">
              OUR BRANCHES
            </h2>
            {/* lagos address  */}
            <div>
              <span className="text-sm font-bold uppercase">Lagos Branch</span>
              <p className="text-lg">
                92, Lanre Awolokun Street, Gbaagada Estate Phase 2, Lagos,
                Nigeria
              </p>
            </div>
            {/* owerri address  */}
            <div>
              <span className="text-sm font-bold uppercase">Owerri Branch</span>
              <p className="text-lg">
                92, Lanre Awolokun Street, GbaagadA Estate Pahse 2, Lagos,
                Nigeria
              </p>
            </div>
            {/* Abuja address  */}
            <div>
              <span className="text-sm font-bold uppercase">Abuja Branch</span>
              <p className="text-lg">
                92, Lanre Awolokun Street, GbaagadA Estate Pahse 2, Lagos,
                Nigeria
              </p>
            </div>
          </div>
          {/* quick links */}
          <div className="flex flex-col gap-5">
            <span className="text-2xl font-calluna underline underline-offset-8">
              QUICK LINKS
            </span>
            <div className="grid grid-cols-2">
              {quicklinks.map((link, index) => (
                <a key={index} href={link.linkHref} className="text-lg">
                  {link.linkName}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* sub footer */}
        <div className="text-center pt-3">
          <p>&copy; 2024 LITTLE ROCK INTERNATIONAL SCHOOLS.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
