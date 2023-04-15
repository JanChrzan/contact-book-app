import { ReactNode } from "react";

type ContactSectionProps = {
  label: string;
  value: ReactNode;
};

const ContactSection = ({ label, value }: ContactSectionProps) => {
  return (
    <>
      {value ? (
        <div className="flex flex-col gap-1 rounded bg-Space-Cadet/50 p-1 sm:flex-row">
          <p className="mr-2 text-start text-xs font-bold sm:w-[25%] sm:text-end md:text-base">
            {label}:
          </p>
          <p className="text-start text-xs sm:w-[70%] sm:text-base">{value}</p>
        </div>
      ) : null}
    </>
  );
};

export default ContactSection;
