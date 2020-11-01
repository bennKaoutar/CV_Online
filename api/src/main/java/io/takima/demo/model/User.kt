package io.takima.demo.model

import javax.persistence.*

/**
 *
 */
@Entity(name = "users")
data class User(
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Id var id: Long?,
        @Column(name = "first_name") var firstName: String?,
        @Column(name = "last_name") var lastName: String?,
        @Column(name = "age") var age: Int?,
        @Column(name = "email") var email: String?,
        @Column(name = "hash") var hash: ByteArray?,
        @Column(name = "salt") var salt: ByteArray?,
        @Column(name = "id_cv") var idCv: Long?,
        @Column(name = "id_image") var idImage: Long?,
        @Column(name = "id_custom") var idCustom : Long?
) {
    constructor() : this(null, null,null, null,null, null, null,null, null, null)
}
