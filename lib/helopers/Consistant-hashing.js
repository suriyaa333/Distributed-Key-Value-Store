
const crypto = require('crypto');
const _ = require('loadash')

// This class just allocates servers to virtual ring and returns a server
// from the ring based on the key

// Todo : server addion and removal


class ConsistantHashing{

    constructor(num_of_servers,range){
        this.num_of_servers = num_of_servers
        this.hash = crypto.createHash('sha256');
        this.range = range;
        this.value_to_server_map = new Map()
    }

    _getHashedValue(s)
    {
        let me = this;
        try{
        me.hash.update(s);
        const digest = me.hash.digest('hex');
        return digest;
        }
        catch(err){
            throw err;
        }
    }

    allocateServersinVirtualRing(){
        let me = this;
        try{
            var range = this.range;
            var num_of_servers = this.num_of_servers;
            var starting_point = Math.floor(range/num_of_servers)
            for(let i=1;i<num_of_servers+1;i++)
            {
                me.value_to_server_map.set(starting_point *i,i);
            }
        }
        catch(err){
            throw err;
        }
    }

    allocateServerToKey(key){
        let me = this;
        try{
        var range = me.range
        var hashed_key = me._getHashedValue(key)
        hashed_key = parseInt(hashed_key,16)%(range+1)
        var allocated_server = me._lookUp(hashed_key,range,me.num_of_servers)
        return allocated_server;
        }
        catch(err){
            throw err;
        }

    }

    _lookUp(hashed_key,range,num_of_servers)
    {
        let me = this;
        try{
            var starting_point = Math.floor(range/num_of_servers);
            var value = starting_point*(Math.ceil(hashed_key/starting_point));
            var server = me.value_to_server_map.get(value)
            return server;
        }
        catch(err){
            throw err;
        }
    }
}
export default ConsistantHashing;