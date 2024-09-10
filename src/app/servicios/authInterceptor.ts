import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { LocalStorageService } from "../servicios/local-storage.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private localStorageService: LocalStorageService
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem("token");

        if(token){
            const cloned = req.clone({
                //headers: req.headers.set("Authorization", "Bearer" + token)
                //Alt 96
                setHeaders: {Authorization: `Bearer ${token}`}
            });

            return next.handle(cloned);            
        }
        else
        {
            return next.handle(req);
        }
    }

    private isBase64(str: string): boolean {
        try {
            return btoa(atob(str)) === str;
        } catch (err) {
            return false;
        }
    }

    private isTokenExpired(token: string): boolean {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const expiry = payload.exp;
            return (Math.floor((new Date).getTime() / 1000)) >= expiry;
        } catch (e) {
            console.error("Error parsing token payload:", e);
            // Considerar el token como expirado si no se puede parsear
            return true; 
        }
    }
}