package io.takima.demo.model

import javax.persistence.*

@Entity(name = "image_model")
data class Image(
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Id var id: Long?,
        @Column(name = "name") var name: String?,
        @Column(name = "type") var type: String?,
        @Column(name = "pic") var pic: ByteArray?) {
    constructor() : this(null, null, null, null)
    constructor(OriginalFilename: String, ContentType: String, Bytes: ByteArray) : this() {
        this.name = OriginalFilename;
        this.type = ContentType;
        this.pic = Bytes
    }
}


