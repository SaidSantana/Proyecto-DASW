
class UserException{
    constructor(errorMessage){
        this.errorMessage = errorMessage
    }
}

class User{
    constructor(name, email, pass, imageUrl, age){
        this._uuid = 0;
        this._name = name;
        this._email = email
        this._pass = pass
        this._imageUrl = imageUrl
        this._gamesPlayed = 0
        this._age = age
    }
    //uuid
    get uuid() {
        return this._uuid;
    }

    set uuid(value) {
        throw new ProductException("No se puede asignar un uuid");
    }

    //name
    get name(){
        return this._name
    }

    set name(value){
        if(!value) throw new UserException("El nombre no puede ser nulo")
        if(value.length === 0)throw new UserException("El nombre no puede ser nulo")
        if(value.length > 10)throw new UserException("El nombre no puede tener más de 10 caracteres")

        this._name = value
    }

    //email
    get email(){
        return this._email
    }

    set email(value){
        if(!value) throw new UserException("El correo no puede ser nulo")
        if(value.length === 0)throw new UserException("El correo no puede ser nulo")
        if(value.length > 30)throw new UserException("El correo no puede tener más de 30 caracteres")

        this._email = value
    }

    //pass
    get pass(){
        return this._pass
    }

    set pass(value){
        if(!value) throw new UserException("El password no puede ser nulo")
        if(value.length === 0)throw new UserException("El pasword no puede ser nulo")
        if(value.length > 20)throw new UserException("El password no puede tener más de 20 caracteres")
    }

    //imageUrl
    get imageUrl() {
        return this._imageUrl;
    }
    
    set imageUrl(value) {
        if (!value) throw new UserException("El imageUrl no puede ser nulo");
        if (value.length === 0) throw new UserException("El imageUrl no puede ser nulo");

        this._imageUrl = value;
    }

    //Age
    get age(){
        return this._age
    }

    set age(value){
        if(value < 3)throw new UserException("Tienes que tener más de 3 años");

        this._age = value
    }

    //funciones de creacion
    static createFromJson(jsonValue) {
        let value = JSON.parse(jsonValue);
        return User.createFromObject(value);
    }
    
    static createFromObject(value) {
        let newUser = {};
        Object.assign(newUser, value);
        Product.cleanObject(newUser);
    
        return new User(newUser.name,newUser.email,newUser.pass, newUser.imageUrl);
    }
    
    static cleanObject(obj) {
        const UserProperties = ["name","email","pass","imageUrl"];
        for (const prop in obj) {
          if (!UserProperties.includes(prop)) {
            delete obj[prop];
          }
        }
    }

}