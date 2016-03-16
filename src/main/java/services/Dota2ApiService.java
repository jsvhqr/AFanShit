/**
 * Created by jsvhqr on 2016-02-24.
 */
package services;


import JsonObjects.JsonMatchHistory;
import okhttp3.OkHttpClient;
import okhttp3.Request;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;


@Path("/dotaInfo/")
public class Dota2ApiService {

    private static final String KEY = "1ED27D8168C151D5FF743AB7FAC2151E";
    private static final String BASE_URL = "https://api.steampowered.com/";

    @GET
    @Path("/matchHistory/{teamMember}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public JsonMatchHistory getMatchHistory(@PathParam("projectName") String teamMember){


        OkHttpClient client = new OkHttpClient();

        if (teamMember.equals("Bulldog")){
            Request r = new Request.Builder().url(BASE_URL +"/IDOTA2Match_570/GetMatchHistory/V001/?key="+KEY+"&account_id=76482434").build();
        }
        else if(teamMember.equals("Akke")){

        }
        else if(teamMember.equals("EGM")){

        }
        else if(teamMember.equals("Loda")){

        }
        else if(teamMember.equals("s4")){

        }


        return null;

    }

}
