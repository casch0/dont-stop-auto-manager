export class Vehicle{

    private id: number;
    private name: String;
    private VIN: String;
    private year: number;
    private make: String;
    private model: String;
    private color: String;
    private mileage: number;
    private user_id: number;
    private insurance_id: number;
    private photoURL: String;


    /**
     * Getter $id
     * @return {number}
     */
	public get $id(): number {
		return this.id;
	}

    /**
     * Getter $name
     * @return {String}
     */
	public get $name(): String {
		return this.name;
	}

    /**
     * Getter $VIN
     * @return {String}
     */
	public get $VIN(): String {
		return this.VIN;
	}

    /**
     * Getter $year
     * @return {number}
     */
	public get $year(): number {
		return this.year;
	}

    /**
     * Getter $make
     * @return {String}
     */
	public get $make(): String {
		return this.make;
	}

    /**
     * Getter $model
     * @return {String}
     */
	public get $model(): String {
		return this.model;
	}

    /**
     * Getter $color
     * @return {String}
     */
	public get $color(): String {
		return this.color;
	}

    /**
     * Getter $mileage
     * @return {number}
     */
	public get $mileage(): number {
		return this.mileage;
	}

    /**
     * Getter $user_id
     * @return {number}
     */
	public get $user_id(): number {
		return this.user_id;
	}

    /**
     * Getter $insurance_id
     * @return {number}
     */
	public get $insurance_id(): number {
		return this.insurance_id;
	}

    /**
     * Getter $photoURL
     * @return {String}
     */
	public get $photoURL(): String {
		return this.photoURL;
	}

    /**
     * Setter $id
     * @param {number} value
     */
	public set $id(value: number) {
		this.id = value;
	}

    /**
     * Setter $name
     * @param {String} value
     */
	public set $name(value: String) {
		this.name = value;
	}

    /**
     * Setter $VIN
     * @param {String} value
     */
	public set $VIN(value: String) {
		this.VIN = value;
	}

    /**
     * Setter $year
     * @param {number} value
     */
	public set $year(value: number) {
		this.year = value;
	}

    /**
     * Setter $make
     * @param {String} value
     */
	public set $make(value: String) {
		this.make = value;
	}

    /**
     * Setter $model
     * @param {String} value
     */
	public set $model(value: String) {
		this.model = value;
	}

    /**
     * Setter $color
     * @param {String} value
     */
	public set $color(value: String) {
		this.color = value;
	}

    /**
     * Setter $mileage
     * @param {number} value
     */
	public set $mileage(value: number) {
		this.mileage = value;
	}

    /**
     * Setter $user_id
     * @param {number} value
     */
	public set $user_id(value: number) {
		this.user_id = value;
	}

    /**
     * Setter $insurance_id
     * @param {number} value
     */
	public set $insurance_id(value: number) {
		this.insurance_id = value;
	}

    /**
     * Setter $photoURL
     * @param {String} value
     */
	public set $photoURL(value: String) {
		this.photoURL = value;
	}


    
    constructor(){
    }
}