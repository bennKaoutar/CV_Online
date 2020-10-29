package io.takima.demo.model

import javax.persistence.*

@Entity(name = "education")
data class Education (
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id var id: Long?,
    @Column(name = "text") var text: String?,
)

{
    constructor() : this(null, null)
}