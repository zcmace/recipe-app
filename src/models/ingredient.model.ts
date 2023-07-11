export class Ingredient {
    name: string;
    description: string;
    imagePath: string;

    constructor(name: string, desc: string, imgPth: string){
        this.name = name;
        this.description = desc;
        this.imagePath = imgPth;
        
    }
}