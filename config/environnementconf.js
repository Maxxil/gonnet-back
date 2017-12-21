module.exports ={
    environnement : 'DEV',
    getListeningPort : function () {
        if(this.environnement == "DEV")
        {
            return 4444;
        }
        else{
            return 8080;
        }
    }
};