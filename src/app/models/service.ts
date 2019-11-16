export class Service{
    private id: number;
    private name: String;
    private type_id: number;
    private cost: number;
    private date: Date;
    private techNote: String;
    private userNote: String;
    private vehicle_id: number;
    private user_id: number;
    private receiptURL: String;

    /**
     * Getter $receiptURL
     * @return {String}
     */
	public get $receiptURL(): String {
		return this.receiptURL;
	}

    /**
     * Setter $receiptURL
     * @param {String} value
     */
	public set $receiptURL(value: String) {
		this.receiptURL = value;
	}
    
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
     * Getter $type_id
     * @return {number}
     */
	public get $type_id(): number {
		return this.type_id;
	}

    /**
     * Getter $cost
     * @return {number}
     */
	public get $cost(): number {
		return this.cost;
	}

    /**
     * Getter $date
     * @return {Date}
     */
	public get $date(): Date {
		return this.date;
	}

    /**
     * Getter $techNote
     * @return {String}
     */
	public get $techNote(): String {
		return this.techNote;
	}

    /**
     * Getter $userNote
     * @return {String}
     */
	public get $userNote(): String {
		return this.userNote;
	}

    /**
     * Getter $vehicle_id
     * @return {number}
     */
	public get $vehicle_id(): number {
		return this.vehicle_id;
	}

    /**
     * Getter $user_id
     * @return {number}
     */
	public get $user_id(): number {
		return this.user_id;
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
     * Setter $type_id
     * @param {number} value
     */
	public set $type_id(value: number) {
		this.type_id = value;
	}

    /**
     * Setter $cost
     * @param {number} value
     */
	public set $cost(value: number) {
		this.cost = value;
	}

    /**
     * Setter $date
     * @param {Date} value
     */
	public set $date(value: Date) {
		this.date = value;
	}

    /**
     * Setter $techNote
     * @param {String} value
     */
	public set $techNote(value: String) {
		this.techNote = value;
	}

    /**
     * Setter $userNote
     * @param {String} value
     */
	public set $userNote(value: String) {
		this.userNote = value;
	}

    /**
     * Setter $vehicle_id
     * @param {number} value
     */
	public set $vehicle_id(value: number) {
		this.vehicle_id = value;
	}

    /**
     * Setter $user_id
     * @param {number} value
     */
	public set $user_id(value: number) {
		this.user_id = value;
	}

    constructor(){
        
    }
}