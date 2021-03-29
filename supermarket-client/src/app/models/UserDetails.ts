export class UserDetails {
    public constructor(
        public token?: string,
        public userType?: string,
        public id?: string,
        public email?: string,
        public firstName?: string,
        public lastName?: string,
        public city?: string,
        public street?: string,
        public password?: string
    ) { }
}