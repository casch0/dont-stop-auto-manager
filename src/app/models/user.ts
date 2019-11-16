export class User {
    private id: number;
    private email: String;
    private password: String;
    private role_id: number;
    private company_id: number;
    private firstName: String;
    private lastName: String;
    private pictureURL: String;


    /**
     * Getter $id
     * @return {number}
     */
	public get $id(): number {
		return this.id;
	}

    /**
     * Getter $email
     * @return {String}
     */
	public get $email(): String {
		return this.email;
	}

    /**
     * Getter $password
     * @return {String}
     */
	public get $password(): String {
		return this.password;
	}

    /**
     * Getter $role_id
     * @return {number}
     */
	public get $role_id(): number {
		return this.role_id;
	}

    /**
     * Getter $company_id
     * @return {number}
     */
	public get $company_id(): number {
		return this.company_id;
	}

    /**
     * Getter $firstName
     * @return {String}
     */
	public get $firstName(): String {
		return this.firstName;
	}

    /**
     * Getter $lastName
     * @return {String}
     */
	public get $lastName(): String {
		return this.lastName;
	}

    /**
     * Getter $pictureURL
     * @return {String}
     */
	public get $pictureURL(): String {
		return this.pictureURL;
	}

    /**
     * Setter $id
     * @param {number} value
     */
	public set $id(value: number) {
		this.id = value;
	}

    /**
     * Setter $email
     * @param {String} value
     */
	public set $email(value: String) {
		this.email = value;
	}

    /**
     * Setter $password
     * @param {String} value
     */
	public set $password(value: String) {
		this.password = value;
	}

    /**
     * Setter $role_id
     * @param {number} value
     */
	public set $role_id(value: number) {
		this.role_id = value;
	}

    /**
     * Setter $company_id
     * @param {number} value
     */
	public set $company_id(value: number) {
		this.company_id = value;
	}

    /**
     * Setter $firstName
     * @param {String} value
     */
	public set $firstName(value: String) {
		this.firstName = value;
	}

    /**
     * Setter $lastName
     * @param {String} value
     */
	public set $lastName(value: String) {
		this.lastName = value;
	}

    /**
     * Setter $pictureURL
     * @param {String} value
     */
	public set $pictureURL(value: String) {
		this.pictureURL = value;
	}

    
	constructor() {
    }
    
}