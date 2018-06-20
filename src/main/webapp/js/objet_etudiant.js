

var 
studentID, 
nom,
prenom,
faculte,
departement,
tp,
td,
examen,
pourc;

//Objet etudiant
function ObjEtudiant()
{
    // public property
    this.studentID = '';
    this.nom ='';
    this.prenom = '';
    this.faculte = '';
    this.departement= '';
    this.tp = '';
    this.td= '';
    this.examen ='';
     this.pourc ='';

    // private constructor 
    __construct = function(that) {
          
        that.city = "воронеж";
        that.apartmentID =0;
        that.address = 'воронеж, клльцовская';
        that.number = '3';
        that.page_url = '1';
        that.occupancy = 'free';
        that.lon = "39.101689";
        that.lat = "51.775919";
    }(this)

    // getters and setters
    
    this.getCity = function(){
        return this.city;
        
    }
    
    this.setCity = function(city){
        this.city = city;
    }
    this.getApartmentID= function() {
        return this.apartmentID;
    }

          
    this.setApartmentID = function(apartmentID) {
        this.apartmentID = apartmentID;
    }
    this.getAddress= function() {
        return this.address;
    }

          
    this.setAddress = function(address) {
        this.address = address;
    }

            
    this.getNumber= function() {
        return this.number;
    }

    this.setNumber = function(number) {
        this.number = number;
    }
        
    this.getPage_url= function() {
        return this.page_url;
    }

    this.setPage_url = function(page_url) {
        this.page_url = page_url;
    }
            
    this.getOccupancy= function() {
        return this.occupancy;
    }

    this.setOccupancy = function(occupancy) {
        this.occupancy = occupancy;
    }
             
    this.getLon= function() {
        return this.lon;
    }

    this.setLon = function(lon) {
        this.lon = lon;
    }    
    this.getLat= function() {
        return this.lat;
    }

    this.setLat = function(lat) {
        this.lat = lat;
    }    
}
