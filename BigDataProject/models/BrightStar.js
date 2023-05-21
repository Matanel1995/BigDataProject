

class BrightStar{

    constructor(harvard_ref,RA,DEC,RA_PM,DEC_PM,MAG,Title_HD){
        
        this.harvard_ref = harvard_ref;
        this.RA = RA;
        this.DEC = DEC;
        this.RA_PM = RA_PM;
        this.DEC_PM =DEC_PM;
        this.MAG =MAG;
        this.Title_HD =Title_HD;
    } 
}
module.exports = BrightStar;