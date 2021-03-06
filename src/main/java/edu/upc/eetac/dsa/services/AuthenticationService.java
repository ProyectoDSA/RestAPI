package edu.upc.eetac.dsa.services;


import edu.upc.eetac.dsa.exceptions.PasswordDontMatchException;
import edu.upc.eetac.dsa.exceptions.UserAlreadyExistsException;
import edu.upc.eetac.dsa.exceptions.UserNotFoundException;
import edu.upc.eetac.dsa.models.*;
import edu.upc.eetac.dsa.orm.managers.UserManager;
import edu.upc.eetac.dsa.orm.managers.UserManagerImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

import javax.ws.rs.*;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

//API DE AUTENTICACIÓN ENCARGADA DE LOGIN Y REGISTER

@Api(value = "/auth", description = "Authentication API for Login and Register")
@Path("/auth")
public class AuthenticationService {

    private UserManager auth;

    public AuthenticationService() {
        this.auth = UserManagerImpl.getInstance();
    }

    //Servicio que registra a un nuevo usuario

    @POST
    @ApiOperation(value = "register a new User", notes = "Crea un nuevo usuario")
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Successful", response=TokenStorage.class),
            @ApiResponse(code = 400, message = "Password don't match"),
            @ApiResponse(code = 409, message = "User already exists"),
            @ApiResponse(code = 500, message = "Validation Error")

    })

    @Path("/register")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response register(RegisterCredentials credentials) {
        TokenStorage token = null;
        if(credentials.getNombre().length()==0 || credentials.getMail().length()==0 || credentials.getPassword().length()==0)
            return Response.status(500).build();
        try {
            if (credentials.getPassword().equals(credentials.getConfirm())) {
                this.auth.register(credentials);
                LoginCredentials lc = new LoginCredentials(credentials.getNombre(),credentials.getPassword());
                token = this.auth.login(lc);
                System.out.println("PREGUNTAR COMO HACER TOKEN DEL LOGIN!!!");
            }
            else
                return Response.status(400).build();
        } catch (Exception e) {
            return Response.status(409).build();
        }
        return Response.status(201).entity(token).build();
    }

    //Servicio que permite al usuario iniciar sesión

    @POST
    @ApiOperation(value = "login", notes = "Iniciar sesión")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful", response=TokenStorage.class),
            @ApiResponse(code = 404, message = "User not found"),
            @ApiResponse(code = 409, message = "Password Not Match"),
            @ApiResponse(code = 500, message = "Authentication error")

    })

    @Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response login(LoginCredentials credentials) {
        TokenStorage token = null;
        if (credentials.getNombre().length() == 0 || credentials.getPassword().length() == 0)
            return Response.status(500).build();
        try {
            token = this.auth.login(credentials);
        } catch (PasswordDontMatchException e){
            return Response.status(409).build();
        } catch (UserNotFoundException e){
            return Response.status(404).build();
        }
        catch (Exception e) {
            return Response.status(500).build();
        }

        return Response.status(200).entity(token).build();
    }

}