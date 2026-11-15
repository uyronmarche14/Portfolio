import Image from "next/image";

import { profileData } from "@/lib/data/profile";

/** Single profile photo in a plain rounded rectangle with a formal frame: hairline outline, offset outline and accent corner brackets. */
export function HeroPortrait() {
  return (
    <figure className="relative mx-auto w-full max-w-sm lg:max-w-md">
      <div className="portrait-frame relative">
        {/* offset hairline outline behind the photo */}
        <span aria-hidden="true" className="portrait-offset" />

        <div className="portrait-photo relative aspect-[4/5] w-full overflow-hidden bg-card">
          <Image
            src={profileData.photo.src}
            alt={profileData.photo.alt}
            fill
            priority
            sizes="(max-width: 1024px) 90vw, 440px"
            className="object-cover object-top"
          />
        </div>

        {/* corner brackets, like crop marks */}
        <span aria-hidden="true" className="portrait-corner portrait-corner--tl" />
        <span aria-hidden="true" className="portrait-corner portrait-corner--tr" />
        <span aria-hidden="true" className="portrait-corner portrait-corner--bl" />
        <span aria-hidden="true" className="portrait-corner portrait-corner--br" />
      </div>
    </figure>
  );
}

export default HeroPortrait;
