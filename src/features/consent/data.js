// service
export const tjeneste = [
    {id:1, name: "Lånekassen", bId: [1,2,3] },
    {id:2, name: "FPVS", bId: [2,4]},
];

// policy - has 1 of each grunn,oerson,tjeneste
export const behandling = [
    {id:1, active: true, description: "behandling purpose goes here...", gId:1, pId:1, tId:1},
    {id:2, active: true, description: "Personvernregler gjør at vi må innhente consent for å lagre bla... bla... bla....", gId:1, pId:2, tId:1},
    {id:3, active: false, description: "this is one that should not be active to test the not active stuff", gId:2, pId:3, tId:1},
    {id:4, active: true, description: "here is a picture one that is turned on!", gId:2, pId:3, tId:1},
];

// policy reason
export const behandlingsgrunnlag = [
    {id:1, code: "xxx", name: "Nødvendig for å beskytte vitale interesser"},
    {id:2, code: "zzz", name: "Because we want to make our staff have the illusion of being friendly."},
    {id:3, code: "yyy", name: "Formålet med e-postadressen er å sende ut markedsføring."},

];

// personal info
export const personopplysning = [
    {id:1, code: "email",   name: "personal email account"},
    {id:2, code: "phone",   name: "personal phone number"},
    {id:3, code: "picture", name: "picture"},
];