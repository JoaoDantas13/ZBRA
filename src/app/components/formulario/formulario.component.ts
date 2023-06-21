import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/service/api.service";

@Component({
  selector: "formulario",
  templateUrl: "./formulario.component.html",
  styleUrls: ["./formulario.component.scss"],
})
export class FormularioComponent implements OnInit {
  //Variaveis
  title: string = "Valide sua senha";
  senhaForm: FormGroup;
  loading: boolean = false;
  error: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: ApiService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.senhaForm = this.formBuilder.group({
      nome: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      senha: ["", [this.senhaValidator]],
    });
  }

  senhaValidator(control: FormControl): ValidationErrors | null {
    const senha = control.value;

    // Verificar se a senha atende aos critérios
    if (
      !/^\d{6}$/.test(senha) ||
      parseInt(senha) < 184759 ||
      parseInt(senha) > 856920
    ) {
      return { senhaInvalida: true };
    }

    // Verificar se dois dígitos adjacentes são iguais
    let digitosCrescentes = true;
    for (let i = 0; i < senha.length - 1; i++) {
      if (parseInt(senha[i]) > parseInt(senha[i + 1])) {
        digitosCrescentes = false;
        break;
      }
    }

    if (!digitosCrescentes) {
      return { senhaInvalida: true };
    }
    return null;
  }

  enviar() {
    this.loading = true;
    if (this.senhaForm.valid) {
      //Formulario ficara desabilitado.
      this.senhaForm.disable();

      // Chamar a API para enviar os dados do formulário
      this.service.postFormulario(this.senhaForm.value).subscribe(
        (response) => {
          // Lógica para lidar com a resposta da API
          this.toastr.success("Senha enviada com sucesso!", "Tudo certo!");
          this.senhaForm.enable();
          this.senhaForm.reset();
          this.loading = false;
        },
        (error) => {
          //Mensagem de Erro vindo da Api.
          this.toastr.error(error, "Ops!");
          this.senhaForm.enable();
          this.senhaForm.reset();
          this.loading = false;
          this.error = true;
        }
      );
    } else {
      alert("teste");
    }
  }
}
