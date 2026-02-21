// assets/js/auth.js
import { supabase } from './config.js';

document.addEventListener("DOMContentLoaded", () => {
  
  // --- REGISTRO (Sign Up) ---
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const fullName = document.getElementById("fullName").value;
      const role = document.getElementById("role").value;

      // Paso 1: Crear usuario en Auth
      const { data, error: authError } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (authError) {
        alert("Error en cuenta: " + authError.message);
        return;
      }

      // Paso 2: Crear perfil en la tabla 'profiles'
      if (data.user) {
        const { error: profileError } = await supabase.from('profiles').insert([
          { id: data.user.id, full_name: fullName, role: role }
        ]);

        if (profileError) {
          alert("Error de RLS en perfil: " + profileError.message);
        } else {
          alert("¡Registro completo! Ahora puedes iniciar sesión.");
          window.location.href = "login.html";
        }
      }
    });
  }

  // --- INICIO DE SESIÓN (Login) ---
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        alert("Error de login: " + error.message);
      } else {
        // Obtenemos el rol para redirigir
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();

        window.location.href = profile?.role === "restaurant" 
          ? "../views/restaurant/dashboard.html" 
          : "../views/customer/home.html";
      }
    });
  }
});