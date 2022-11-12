type Sex = 'Male' | 'Female' | 'Other';

interface IWriterCreate {
  name: string;
  birthDate: string;
  sex: Sex;
}

export default IWriterCreate;
