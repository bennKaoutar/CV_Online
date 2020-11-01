package io.takima.demo.model

import javax.persistence.*

@Entity(name = "custom")
data class Custom(
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Id var id: Long?,
        @Column(name = "banner") var banner: String?,
        @Column(name = "titles") var titles: String?) {
    constructor() : this(null, null, null)
}
