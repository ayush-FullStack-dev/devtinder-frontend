import { googleSans } from "@/assets/fonts/font.google";
import { Checkbox } from "../ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "../ui/field";

type CheckboxWithDescriptionProps = {
  title: string;
  description: string;
  className?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

const CheckboxWithDescription = ({
  title,
  description,
  className,
  onCheckedChange,
  checked,
}: CheckboxWithDescriptionProps) => {
  return (
    <FieldGroup className={`w-auto ${className}`}>
      <Field orientation="horizontal">
        <Checkbox
          checked={checked}
          onCheckedChange={onCheckedChange}
          className="h-5 w-5"
        />
        <FieldContent>
          <FieldLabel
            htmlFor="terms-checkbox-desc"
            className={`${googleSans.className} tracking-wider`}
          >
            {title}
          </FieldLabel>
          <FieldDescription>{description}</FieldDescription>
        </FieldContent>
      </Field>
    </FieldGroup>
  );
};

export default CheckboxWithDescription;
