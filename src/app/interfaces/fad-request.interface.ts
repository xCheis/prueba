export interface Fad {
    product: Product;
    beneficiary: Beneficiary;
}

interface Product {
    productId: string;
    productCode: string;
}

interface Beneficiary{
    person: Person;
    contactPoint: ContactPoint;
}

interface Person {
    personName: PersoneName;
}

interface PersoneName{
    givenName: string;
    middleName: string;
    lastName: string;
    secondLastName: string;
}

interface ContactPoint{
    phoneAddress: PhoneAddress;
    electronicAddress: ElectronicAddress;
}

interface PhoneAddress{
    phoneNumber: number;
    internationalCode: string;
}

interface ElectronicAddress{
    emailAddress: string;
}