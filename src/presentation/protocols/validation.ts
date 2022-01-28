export type ValidateProps = {
  fieldName: string;
  fieldValue: string;
};
export interface Validation {
  validate(props: ValidateProps): string | undefined;
}
